export type PayFormation = {
  payDay: Date;
  inAccount: number;
  totalPaid: number;
  usersPaid: UsersPaid[];
}

export type UsersPaid = {
  name: string;
  subname: string;
  amountPenalty: number;
  amountReceibes: number;
}
