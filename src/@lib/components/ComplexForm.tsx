import { useState } from "react";
import { renderLog } from "../../utils";
import { memo } from "../hocs";
import { useNotificationContext } from "../hooks/useNotificationContext";

// ComplexForm 컴포넌트
export const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotificationContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferences: new Set<string>(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 처리
    addNotification("폼이 성공적으로 제출되었습니다.", "success");
    setFormData({
      name: "",
      email: "",
      preferences: new Set(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => {
      const newPreferences = new Set(prev.preferences);
      if (newPreferences.has(preference)) {
        newPreferences.delete(preference);
      } else {
        newPreferences.add(preference);
      }
      return {
        ...prev,
        preferences: newPreferences,
      };
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">선호도:</label>
          <div className="space-y-2">
            {["디자인", "개발", "마케팅"].map((preference) => (
              <label key={preference} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.preferences.has(preference)}
                  onChange={() => handlePreferenceChange(preference)}
                  className="mr-2"
                />
                {preference}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          제출
        </button>
      </form>
    </div>
  );
});
