export enum TextType {
    AtNoticebar = 1,
    OcrText = 2,
    ImageType = 3,
    NotWords = 4,
    TIPS = 5,
}

export interface URLParamType {
    url: string
}

export interface ReponseOcrResult {
    cookies: any;
    data: string;
    errMsg: string;
    header: object; 
    statusCode: number;
}

export interface ReponseOcrResultData {
    words_result: WordsResultObj[],
    words_result_num: number
    log_id: number
}

export interface WordsResultObj {
    words: string
}