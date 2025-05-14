import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Modal from "../../components/UI/Modal/Modal";
import api from "../../api";
import styles from "./ProfileEdit.module.css";

export default function ProfileEdit({ isOpen, onClose }) {
    const { user, fetchUserProfile } = useContext(UserContext);
    const [form, setForm] = useState({ name: "", email: "", password: "", avatar: null });
    const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        if (isOpen && user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: "",
                avatar: null,
            });
            if (user.avatar) {
                setAvatarPreview(
                    user.avatar.startsWith("http") ? user.avatar : `http://localhost:5000${user.avatar}`
                );
            } else {
                setAvatarPreview("");
            }
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            if (form.password) {
                formData.append("password", form.password);
            }
            if (form.avatar) {
                formData.append("avatar", form.avatar);
            }

            await api.put("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            await fetchUserProfile();

            onClose();
        } catch (error) {
            console.error("Ошибка обновления профиля:", error);
            alert("Ошибка при обновлении профиля");
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Редактирование профиля</h2>
            <form key={user?.id} onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Имя:
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                    Пароль:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Оставьте пустым для сохранения текущего"
                    />
                </label>
                <label className={styles.fileLabel}>
                    Выбрать аватар
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className={styles.fileInput}
                    />
                </label>
                {avatarPreview && (
                    <img src={avatarPreview} alt="Превью аватара" className={styles.avatarPreview} />
                )}
                <button type="submit" className={styles.saveBtn}>
                    Сохранить
                </button>
            </form>
        </Modal>
    );
}
