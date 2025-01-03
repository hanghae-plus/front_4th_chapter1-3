import { useState } from "react";
import { useCallback, useMemo } from "../@lib/hooks";
import { memo } from "../@lib/hocs";
import { renderLog } from "../utils";
import { useNotificationActions, useNotificationState } from "../hooks";

export const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotificationActions();

  // notifications 상태를 구독
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { notifications } = useNotificationState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // 폼 유효성 검사
      if (!formData.name || !formData.email) {
        addNotification("이름과 이메일은 필수 입력 사항입니다.", "warning");
        return;
      }
      addNotification("폼이 성공적으로 제출되었습니다", "success");
    },
    [addNotification, formData.name, formData.email],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || 0 : value,
      }));
    },
    [],
  );

  const handlePreferenceChange = useCallback((preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  }, []);

  // useMemo를 사용하여 폼 유효성 메시지를 메모이제이션
  const validationMessage = useMemo(() => {
    if (!formData.name || !formData.email) {
      return "이름과 이메일을 모두 입력해주세요.";
    }
    return null;
  }, [formData.name, formData.email]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <div className="space-x-4">
          {["독서", "운동", "음악", "여행"].map((pref) => (
            <label key={pref} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences.includes(pref)}
                onChange={() => handlePreferenceChange(pref)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        {validationMessage && (
          <div className="text-red-500 text-sm">{validationMessage}</div>
        )}
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
