import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./style.scss";
import axios from "axios";
import SheetTable from "./components/SheetTable";
import { TopicCategory } from "../../dto/topic.dto"; // Assuming this type is defined elsewhere in your app

function Topics() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [topics, setTopics] = useState<TopicCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching the topics data
  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // or however you're storing the token

        const response = await axios.get(
          "https://dsa-backend-b74p.onrender.com/api/dsaTopics/dsa",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: TopicCategory[] = response.data;

        setTopics(data);

        // Initialize all categories as expanded by default
        const initialExpanded = data.reduce((acc, item) => {
          acc[item.name] = true;
          return acc;
        }, {} as Record<string, boolean>);

        setExpanded(initialExpanded);
      } catch (err) {
        setError("Failed to fetch topics data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Toggle category visibility
  const toggleSection = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="dashboard">
      <div className="heading">
        <h2>Topics</h2>
        <p>Explore these exciting topics!</p>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Render topics */}
      {topics.map((topicSection) => (
       <section
  key={topicSection._id}
  className="topics-section"
  style={{
    marginBottom: "20px",
    paddingBottom: expanded[topicSection.name] ? "10px" : "0",
  }}
>
  <div
    onClick={() => toggleSection(topicSection.name)}
    className="algorithm-card"
  >
    <div className="dsa-topicdiv">
      <h3>{topicSection.name.replace(/([A-Z])/g, " $1").trim()}</h3>
      <span className={`status ${topicSection.status.toLowerCase()}`}>
        {topicSection.status}
      </span>
    </div>

    {expanded[topicSection.name] ? (
      <IoIosArrowUp />
    ) : (
      <IoIosArrowDown />
    )}
  </div>

  {expanded[topicSection.name] && (
    <SheetTable
      topicSection={topicSection.subtopics}
      setTopics={setTopics}
      topicId={topicSection._id}
    />
  )}
</section>

      ))}
    </div>
  );
}

export default Topics;
