export type MusicSheetDTO ={
  musicSheetPdf: string | ArrayBuffer | null,
  formationId: number | undefined, //Integer
}
export type MusicSheetDTOResponse = {
  musicSheetPdf: string,
}
