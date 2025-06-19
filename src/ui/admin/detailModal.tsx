import { ContactWithCategory } from "@/lib/types/contact";
import Spinner from "../Spinner";


type Props = {
  selectedContact: ContactWithCategory | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactWithCategory | null>>;
  handleDelete: () => void;
  pending: boolean;
}

export default function DetailModal({ selectedContact, setSelectedContact, handleDelete, pending }:Props) {

  const dt = 'w-[35%] py-2';
  const dd = 'w-[65%] p-2';

  return (
    <>
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

          <div className="bg-white rounded-sm shadow-lg p-20 w-[70%] lg:w-[40%] relative">

            <div className="absolute top-4 right-6">
              <button
                onClick={() => setSelectedContact(null)}
                className="border px-2 py-1 rounded-full hover:cursor-pointer hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <dl className="flex flex-wrap mb-10">
              <dt className={dt}>お名前</dt>
              <dd className={dd}>{selectedContact.name}</dd>
              <dt className={dt}>性別</dt>
              <dd className={dd}>{selectedContact.gender}</dd>
              <dt className={dt}>メールアドレス</dt>
              <dd className={dd}>{selectedContact.email}</dd>
              <dt className={dt}>電話番号</dt>
              <dd className={dd}>{selectedContact.tel}</dd>
              <dt className={dt}>住所</dt>
              <dd className={dd}>{selectedContact.building}</dd>
              <dt className={dt}>お問い合わせの種類</dt>
              <dd className={dd}>{selectedContact.category.category}</dd>
              <dt className={dt}>お問い合わせの内容</dt>
              <dd className={dd}>{selectedContact.content}</dd>
            </dl>

            <div className="flex justify-center">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded-xs hover:cursor-pointer hover:opacity-80 flex items-center gap-2"
              >
                {pending && <Spinner />}
                削除
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}