import "./Progress.css";

function Progress() {
  return (
    <div className="progress-page">
      <h2>📊 Progress</h2>
      <p>Your learning stats will appear here!</p>
      <ul>
        <li>✅ Completed 5 lessons</li>
        <li>🔥 2 active study streaks</li>
        <li>⭐ AI quizzes: 3/5 correct</li>
      </ul>
    </div>
  );
}

export default Progress;
