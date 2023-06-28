
/**
 *
 * @author jerry
 * @description
 * Media file async loader
 *
 */
 class FileLoader {
  private fileReader: FileReader;

  constructor() {
    this.fileReader = new FileReader();
  }

  /*
  readAsArrayBuffer - ArrayBuffer
  readAsBinaryString - 0~255 범위의 문자열
  readAsDataURL - Base64
  readAsText - utf8 or utf16 String
  */
  async readFileData(file: File) {
    return new Promise<string>((resolve, reject) => {

      this.fileReader.onload = (e) => {
        console.log("onload worked");
        if (e.target) {
          console.log("target result - ", e.target.result);

          // step2: 읽기가 완료되면 resolve 리턴
          const base64 = e.target.result as string;
          if (base64) {
            resolve(base64);
          }
        }
      }

      this.fileReader.onloadend = (e) => {
        console.log("onloadend worked");
      }

      this.fileReader.onerror = (error) => {
        console.log("onerror - ", error);
        reject(error);
      }

      // step1: 파일을 읽어 버퍼에 저장합니다.(base64 인코딩)
      this.fileReader.readAsDataURL(file);
    })
  }

  async readFileDataSlice(file: File, start:number, end:number) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      
      this.fileReader.onloadend = (e) => {
        if (e.target) {
          console.log("e.target.readyState - ", e.target.readyState);
          if (e.target.readyState == FileReader.DONE) {
            resolve(e.target.result as ArrayBuffer);
          }
        }
      };
      
      this.fileReader.onerror = () => {
        console.log(`onerror - ${this.fileReader.error}`);
        reject(this.fileReader.error)
      };

      const blob = file.slice(start,end+1);
      this.fileReader.readAsArrayBuffer(blob); 
    })
  }

}

export default FileLoader;