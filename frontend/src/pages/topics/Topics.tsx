import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./style.scss";
import axios from "axios";
import SheetTable from "./components/SheetTable";
import { TopicCategory } from "../../dto/topic.dto";

function Topics() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [topics, setTopics] = useState<TopicCategory[]>([]);

  // const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // or however you're storing the token

        const response = await axios.get(
          "http://localhost:3001/api/topics/topics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: TopicCategory[] = response.data;
        setTopics(data);
        // Initialize all categories as expanded
        const initialExpanded = data.reduce((acc, item) => {
          acc[item.category] = true;
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

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  
  return (
    <div className="dashboard">
      <div className="heading">
        <h2>Topics</h2>
        <p>Explore these exiting topics!</p>
      </div>

      {topics.map((topicSection) => (
        <section
          key={topicSection._id}
          className="topics-section"
          style={{
            marginBottom: "20px",
            paddingBottom: expanded[topicSection.category] ? "10px" : "0",
          }}
        >
          <div
            onClick={() => toggleSection(topicSection.category)}
            className="algorithm-card"
          >
            <h3>{topicSection.category.replace(/([A-Z])/g, " $1").trim()}</h3>
            {expanded[topicSection.category] ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </div>

          {expanded[topicSection.category] && <SheetTable  topicSection={topicSection} setTopics={setTopics}/>}
        </section>
      ))}
    </div>
  );
}

export default Topics;
