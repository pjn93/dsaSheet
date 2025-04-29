import React from 'react';
import axios from "axios";
import { TopicCategory } from '../../../dto/topic.dto';


const SheetTable = ({ topicSection,setTopics }: { topicSection: TopicCategory; setTopics: any}) => {

  const toggleStatus = async (category: string, itemId: string, topicId: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem("token");

      // Send PUT request to update status in backend
      await axios.put(
        `http://localhost:3001/api/topics/${topicId}/items/${itemId}`,
        {}, // No body needed since backend sets status to "Done"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI only after backend update succeeds
      setTopics((prev) =>
        prev.map((section) =>
          section._id === topicId
            ? {
                ...section,
                items: section.items.map((item) =>
                  item._id === itemId
                    ? {
                        ...item,
                        status: currentStatus === "Done" ? "Pending" : "Done",
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
    <h3>Sub Topics</h3>
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
        {topicSection.items.map((topic, index) => (
          <tr key={index}>
            <td>
            <input
                  type="checkbox"
                  checked={topic.status === "Done"}
                  onChange={() => toggleStatus(topicSection.category, topic._id, topicSection._id, topic.status)}
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
