import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "./file.service";
import { getFileBuffer } from "./testing/fileToBuffer";
import { join } from "path";

describe("FileService",  () => {

    let fileService: FileService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [FileService],
        }).compile();

        fileService = module.get<FileService>(FileService);
    });

    it("should be defined", () => {
        expect(fileService).toBeDefined();
    });
    
    it("Should upload a file",async () => {
        const path = join(__dirname, 'testing', 'file', 'testfile.txt')
        const {buffer, stream} = await getFileBuffer(path)
    
        const fileTxtMock: Express.Multer.File = {
           fieldname: 'filetest',
           originalname: 'file.txt',
           encoding: '7bit',
           mimetype: 'text/plain',
           size: 1024 * 2,
           stream: stream,
           destination: '',
           filename: 'file',
           path: 'path-file',
           buffer: buffer,
        }
        await fileService.Upload(fileTxtMock, path)
    })
})