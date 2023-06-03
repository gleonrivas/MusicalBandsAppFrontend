import {FormationType} from "./formationType.model";

export type Treasury = {
  id: number;
  receiveMoneyDate: Date;
  formation: FormationType;
  amount: number;
  active: boolean;
}
