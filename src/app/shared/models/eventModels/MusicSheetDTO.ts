export type MusicSheetDTO ={
  musicSheetPdf: string | ArrayBuffer | null,
  formationId: number | undefined, //Integer
  userId: number | undefined,
}

export type MusicSheetDTOResponse = {
  musicSheetPdf: string,
  formationId: number | undefined, //Integer
}
