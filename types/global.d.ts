export type BillItem = {
  item: string;
  description: string;
  briefs: string;
  measurement: string;
};

export type BillData = {
  client: string;
  project: string;
  date: string;
  items: BillItem[];
};

export type BillContextType = {
  billData: BillData;
  updateBillData: (data: Partial<BillData>) => void;
  addItem: (item: BillItem) => void;
  editItem: (index: number, item: BillItem) => void;
  deleteItem: (index: number) => void;
};
