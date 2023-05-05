import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  // MaxFileSizeValidator, //verify file max size
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "../files/file.service";
import { join } from "path";
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiNoContentResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ManageReceivedFileService } from "./manageReceivedFile.service";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly fileService: FileService,
    private readonly managerFileService: ManageReceivedFileService
  ) {}

  @ApiBadRequestResponse({description: "Bad request"})
  @ApiNoContentResponse()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } } 
    }
  })
  @Post("upload")
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "text/plain" }),

          //await to enter maximum file size
          // new MaxFileSizeValidator({maxSize: 1024 * 5})
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const path = join(
      __dirname,
      "..",
      "..",
      "storage",
      `${file.originalname}.txt`
    );
    try {
      await this.fileService.Upload(file, path);
      await this.managerFileService.createTransactionByFile(path);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { success: true };
  }

  @ApiBadRequestResponse({description: "Bad request"})
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @ApiNotFoundResponse({description: "Not found"})
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.transactionsService.findOne(+id);
  }

  @ApiNotFoundResponse({description: "Not found"})
  @ApiBadRequestResponse({description: "Bad request"})
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @ApiNotFoundResponse({description: "Not found"})
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.transactionsService.remove(+id);
  }
}
