import React from 'react';
import axios from "axios";
import { TopicItem } from '../../../dto/topic.dto';


interface SheetTableProps {
  topicSection: TopicItem[];
  topicId: string; // You now need to pass this from parent
  setTopics: React.Dispatch<React.SetStateAction<any>>;
}

const SheetTable: React.FC<SheetTableProps> = ({ topicSection, topicId, setTopics }) => {

  const toggleStatus = async (itemId: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem("token");
  
      // Send updated status to backend
      const newStatus = currentStatus === "Done" ? "Pending" : "Done";
  
      await axios.put(
        `https://dsasheet1.onrender.com/api/dsaTopics/${topicId}/subtopics/${itemId}`,
        { status: newStatus }, // send correct status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update local state
      setTopics((prev: any[]) =>
        prev.map((section) =>
          section._id === topicId
            ? {
                ...section,
                subtopics: section.subtopics.map((item: TopicItem) =>
                  item._id === itemId
                    ? {
                        ...item,
                        status: newStatus,
                      }
                    : item
                ),
              }
            : section
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Something went wrong while updating status.");
    }
  };
  

  return (
    <div className="sub-topics">
    <h4>Sub Topics</h4>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>LeetCode</th>
          <th>YouTube</th>
          <th>Article</th>
          <th>Level</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {topicSection.map((topic, index) => (
          <tr key={index}>
            <td>
            <input
                  type="checkbox"
                  checked={topic.status === "Done"}
                  onChange={() => toggleStatus(topic._id, topic.status)}
                />
              <span style={{ marginLeft: "5px" }}>{topic.name}</span>
            </td>
            <td>
              <a
                href={topic.leetcode}
                target="_blank"
                rel="noopener noreferrer"
              >
                Practise
              </a>
            </td>
            <td>
              <a
                href={topic.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch
              </a>
            </td>
            <td>
              <a
                href={topic.article}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read
              </a>
            </td>
            <td>
              <span className={`level ${topic.level.toLowerCase()}`}>
                {topic.level}
              </span>
            </td>
            <td>
              <span className={`status ${topic.status.toLowerCase()}`}>
                {topic.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default SheetTable
