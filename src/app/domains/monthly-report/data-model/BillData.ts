import {PaymentMethodType} from "../../shared/data-model/PaymentMethodType";

export interface BillData {
  billDate: Date,
  bruttoValue: number,
  billType: string,
  paymentMethodType: PaymentMethodType,
  projectName: string,
  attachmentBase64String: string
}
