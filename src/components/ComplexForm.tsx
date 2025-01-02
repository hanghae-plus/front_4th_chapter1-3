import { renderLog } from "../utils";
import { memo, useCallback } from "../@lib";
import { useNotificationContext } from "../@lib/hooks/useContext.ts";
import { useForm } from "../@lib/hooks/useForm.ts";
import { validateForm } from "../@lib/utils/formValidation.ts";

const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotificationContext();

  const onSubmit = useCallback(() => {
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  }, [addNotification]);

  const { formData, handleSubmit, handleChange, handleCheckboxChange, errors } =
    useForm({
      initialState: {
        name: "",
        email: "",
        age: 0,
        preferences: [] as string[],
      },
      validate: validateForm,
      onSubmit: onSubmit,
    });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors?.name && <ErrorMessage message={errors.name} />}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors?.email && <ErrorMessage message={errors.email} />}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {errors?.age && <ErrorMessage message={errors.age} />}
        <div className="space-x-4">
          {["독서", "운동", "음악", "여행"].map((pref) => (
            <label key={pref} className="inline-flex items-center">
              <input
                type="checkbox"
                name="prefrences"
                checked={formData.preferences.includes(pref)}
                onChange={() => handleCheckboxChange(pref)}
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
});

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <span className="text-red-600 text-sm">{message}</span>;
};

export default ComplexForm;
