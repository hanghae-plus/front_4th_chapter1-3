import { renderLog } from "../../utils";
import { useGetNoticationActions } from "../../contexts/notification-context/useNotificationContext";
import { useRef } from "../../@lib";

const PREFERENCES = ["독서", "운동", "음악", "여행"];

export const ComplexForm: React.FC = () => {
  renderLog("ComplexForm rendered");

  const { addNotification } = useGetNoticationActions();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const age = (form.elements.namedItem("age") as HTMLInputElement).value;
    const preferences = Array.from(
      form.elements.namedItem("preferences") as RadioNodeList,
    )
      .filter((input) => (input as HTMLInputElement).checked)
      .map((input) => (input as HTMLInputElement).value);

    window.alert(`
      이름: ${name}
      이메일: ${email}
      나이: ${age}
      좋아하는 것: ${preferences}
      `);

    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="age"
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <div className="space-x-4">
          {PREFERENCES.map((pref) => (
            <label key={pref} className="inline-flex items-center">
              <input
                name="preferences"
                type="checkbox"
                value={pref}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
};
