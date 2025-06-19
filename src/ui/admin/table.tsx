import { ContactWithCategory } from "@/lib/types/contact";

type Props = {
  contactList: ContactWithCategory[];
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactWithCategory | null>>;
}

export default function AdminTable({ contactList, setSelectedContact }: Props) {

  const th = 'font-normal p-3 pl-6';
  const td = 'p-3 pl-6';

  return (
    <table className="w-full">
      <tbody>
        <tr className="bg-[#8C7B6F] text-white border border-gray-300 text-left">
          <th className={th}>お名前</th>
          <th className={th}>性別</th>
          <th className={th}>メールアドレス</th>
          <th className={th}>お問い合わせの種類</th>
          <th className={th}></th>
        </tr>
        {contactList.map((contact) => (
          <tr key={contact.id} className="border border-gray-300">
            <td className={td}>{contact.name}</td>
            <td className={td}>{contact.gender}</td>
            <td className={td}>{contact.email}</td>
            <td className={td}>{contact.category.category}</td>
            <td className={td}>
              <button
                onClick={() => setSelectedContact(contact)}
                className="bg-[#FDF8F4] text-[#ab9e93] border border-[E8DCD2] px-1 rounded-xs hover:bg-[#f4f0ec] hover:cursor-pointer"
              >
                詳細
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  )
}