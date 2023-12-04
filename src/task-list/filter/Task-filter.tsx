import React, { useState } from 'react';
import { TaskModel } from '../../model/task-model';
import { FaFilter } from 'react-icons/fa';
import { FaSortAmountDownAlt } from "react-icons/fa";
import './Task-filter.css'

interface TaskFilterProps {
  data: TaskModel[];
  onFilterChange: (filteredData: TaskModel[]) => void;
}

function TaskFilter({ data, onFilterChange }: TaskFilterProps) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedDisplayOption, setSelectedDisplayOption] = useState<
    'checked' | 'unchecked' | 'both'
  >('both');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleDisplayOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDisplayOption = event.target.value as 'checked' | 'unchecked' | 'both';

    // Update the selected display option
    setSelectedDisplayOption(newDisplayOption);

    // Update the filtered data based on the new display option
    const updatedFilteredData = data.filter((task) => {
      const isTaskChecked = task.checked;

      // Check if the task has the selected tags (if any)
      const hasSelectedTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => task.tags.includes(tag));

      switch (newDisplayOption) {
        case 'checked':
          return isTaskChecked && hasSelectedTags;
        case 'unchecked':
          return !isTaskChecked && hasSelectedTags;
        default:
          // 'both' option
          return hasSelectedTags;
      }
    });

    // Notify the parent component about the updated filtered data
    onFilterChange(updatedFilteredData);
  };

  const handleTagChange = (tag: string) => {
    // Toggle the selected tag
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    // Update the selected tags
    setSelectedTags(newTags);

    // Update the filtered data based on the new selected tags
    const updatedFilteredData = data.filter((task) => {
      const isTaskChecked = task.checked;

      // Check if the task has the selected tags (if any)
      const hasSelectedTags =
        newTags.length === 0 ||
        newTags.some((t) => task.tags.includes(t));

      switch (selectedDisplayOption) {
        case 'checked':
          return isTaskChecked && hasSelectedTags;
        case 'unchecked':
          return !isTaskChecked && hasSelectedTags;
        default:
          // 'both' option
          return hasSelectedTags;
      }
    });

    // Notify the parent component about the updated filtered data
    onFilterChange(updatedFilteredData);
  };

  return (
    <div className="filter">
        <div className="filter-icon">
          <FaFilter onClick={() => setShowFilter(!showFilter)}/>
          <FaSortAmountDownAlt />
        </div>

        {showFilter === true && (
            <div>
            <label>
                <input
                type="radio"
                value="checked"
                checked={selectedDisplayOption === 'checked'}
                onChange={handleDisplayOptionChange}
                />
                Checked
            </label>
            <label>
                <input
                type="radio"
                value="unchecked"
                checked={selectedDisplayOption === 'unchecked'}
                onChange={handleDisplayOptionChange}
                />
                Unchecked
            </label>
            <label>
                <input
                type="radio"
                value="both"
                checked={selectedDisplayOption === 'both'}
                onChange={handleDisplayOptionChange}
                />
                Both
            </label>

            <div>
                {Array.from(new Set(data.flatMap((task) => task.tags))).map(
                (tag) => (
                    <label key={tag}>
                    <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                    />
                    {tag}
                    </label>
                )
                )}
            </div>
            </div>
        )}
    </div>
  );
}

export default TaskFilter;
