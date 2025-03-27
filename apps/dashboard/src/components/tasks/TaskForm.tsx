import { FC, useState } from 'react';
import { InputField } from '../atoms/InputField';
import styles from './TaskForm.module.scss';

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
}

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
}

export const TaskForm: FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || {
      title: '',
      description: '',
      dueDate: '',
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const now = new Date();

      if (selectedDate < now) {
        newErrors.dueDate = 'Due date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? styles.error : ''}
        />
        {errors.description && (
          <span className={styles.errorMessage}>{errors.description}</span>
        )}
      </div>

      <InputField
        label="Due Date"
        type="datetime-local"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        error={errors.dueDate}
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};
