export interface Tps {
  id: number;
  name: string;
  total_votes: number;
  calegs: TpsCalegs[];
  status: TpsStatus;
}

interface TpsCalegs {
  id: number;
  name: string;
  votes: number;
}

interface TpsStatus {
  id: number;
  name: string;
}
