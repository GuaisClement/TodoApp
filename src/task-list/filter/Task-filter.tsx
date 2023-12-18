import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TaskModel } from '../../model/task-model';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { FaSortAmountDownAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import './Task-filter.css'

type TaskFilterProps = {
  data: TaskModel[];
  onFilterChange: (filteredData: TaskModel[]) => void;
  getNewFilteredData: () => TaskModel[];
  setNewFilteredData: (newTask: TaskModel) =>  void;
}

const TaskFilter = forwardRef(({ data, onFilterChange }: TaskFilterProps, ref) => {

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedDisplayOption, setSelectedDisplayOption] = useState<'checked' | 'unchecked' | 'both'>('both');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  

  useImperativeHandle(ref, () => ({
    getNewFilteredData,
    setNewFilteredData,
    toggleSortOrder,
  }));

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    updateFilteredData(); 
  };

  const handleDisplayOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplayOption = event.target.value as 'checked' | 'unchecked' | 'both';
    setSelectedDisplayOption(newDisplayOption);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;
    if (!selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  useEffect(() => {
    // This useEffect will be triggered whenever selectedDisplayOption or selectedTags change
    updateFilteredData();
  }, [selectedDisplayOption, selectedTags]);

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    updateFilteredData();
  };

  const setNewFilteredData = (newTask: TaskModel): void => {
    data.push(newTask);    
    updateFilteredData();
  }

  const getNewFilteredData = (): TaskModel[] => {
    return data.filter((task) => {
      const isTaskChecked = task.checked;
      const hasSelectedTags = selectedTags.length === 0 || selectedTags.some((t) => task.tags.includes(t));
      const isTaskToday = isDateToday(task.date);

      if (isTaskToday && !task.tags.includes('today')) {
        task.tags.push('today');
      }else if (!isTaskToday && task.tags.includes('today')) {
        const index = task.tags.indexOf('today');
        task.tags.splice(index, 1);
      }

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
  };

  const updateFilteredData = () => {
    const updatedFilteredData = getNewFilteredData();
    const sortedData = sortOrder === 'asc'
      ? [...updatedFilteredData].sort((a, b) => a.date.getTime() - b.date.getTime())
      : [...updatedFilteredData].sort((a, b) => b.date.getTime() - a.date.getTime());

    onFilterChange(sortedData);
  };

  const isDateToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const allTags = Array.from(new Set(data.flatMap((task) => task.tags)));
  const remainingTags = allTags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div className="filter">
        <div className="filter-icon">
          <FaFilter onClick={() => setShowFilter(!showFilter)}/>
          {sortOrder === 'asc' ? (
            <FaSortAmountUpAlt onClick={toggleSortOrder} />
          ) : (            
            <FaSortAmountDownAlt onClick={toggleSortOrder} />
          )}
        </div>

        {showFilter === true && (
          <div>
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
            </div>
            <div>
            <label>
              <select onChange={handleTagChange} value="">
                <option value="" disabled hidden>
                  Choose a Tag
                </option>
                {remainingTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
            </div>

            <div>
              {selectedTags.map((tag) => (
                <span key={tag} >
                  {tag}
                  <RxCross1 onClick={() => handleRemoveTag(tag)} />
                </span>
              ))}
            </div>
          </div>
        )}
    </div>
  );
});

export { TaskFilter };
export type { TaskFilterProps };

