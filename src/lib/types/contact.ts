export type ContactWithCategory = {
    id: number;
    name: string;
    gender: string;
    email: string;
    tel: string;
    address: string;
    building: string | null;
    content: string;
    create_at: string;
    category: {
        id: number;
        category: string;
        create_at: string;
    };
  };