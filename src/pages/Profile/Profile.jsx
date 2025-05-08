
export default function Profile() {
    return (
        <div className="profile-page">
            <div className="profile-grid">
                <div className="profile-card">
                    <img src="avatar.png" alt="Аватар" className="profile-avatar"/>
                    <h2>Владимир Барышников</h2>
                    <div className="profile-email">VladimirBaryshnikov@example.com</div>
                    <div className="profile-stats">
                        <div>Пройдено тренировок: 125</div>
                        <div>Выполнено упражнений: 875</div>
                        <div>Средний прогресс: +37%</div>
                    </div>
                </div>
                <div className="profile-charts">
                    <div className="profile-chart">[График 1]</div>
                    <div className="profile-chart">[График 2]</div>
                </div>
            </div>
        </div>

    );
}