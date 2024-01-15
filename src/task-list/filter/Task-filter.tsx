import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TaskModel } from '../../model/task-model';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import './Task-filter.css'

type TaskFilterProps = {
  data: TaskModel[];
  onFilterChange: (filteredData: TaskModel[]) => void;
  getNewFilteredData: () => TaskModel[];
  setNewFilteredData: (newTask: TaskModel) =>  void;
  setFilteredData: (tasks: TaskModel[]) =>  void;
  setNewTagSelected: (tag: string) => void;
}

const TaskFilter = forwardRef(({ data, onFilterChange }: TaskFilterProps, ref) => {

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedDisplayOption, setSelectedDisplayOption] = useState<'checked' | 'unchecked' | 'both'>('both');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');  

  useImperativeHandle(ref, () => ({
    getNewFilteredData,
    setNewFilteredData,
    setFilteredData,
    setNewTagSelected,
    toggleSortOrder,
  }));

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
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
    updateFilteredData();
  }, [selectedDisplayOption, selectedTags, sortOrder]);

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    updateFilteredData();
  };

  const setNewFilteredData = (newTask: TaskModel): void => {
    data.push(newTask);
    updateFilteredData();
  }

  const setFilteredData = (tasks: TaskModel[]): void => {
    data= tasks;
    updateFilteredData();
  }

  const setNewTagSelected = (tag : string ): void => {
    setSelectedTags([...selectedTags, tag]);
    updateFilteredData();
  }

  const getNewFilteredData = (): TaskModel[] => {
    return data.filter((task) => {
      const isTaskChecked = task.checked;
      const hasSelectedTags = selectedTags.length === 0 || selectedTags.some((t) => task.tags.includes(t));      

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
            <div className="checkbox-container">
            <label>
              <input
                type="radio"
                name="displayOption"
                value="checked"
                checked={selectedDisplayOption === 'checked'}
                onChange={handleDisplayOptionChange}
                className="hidden-checkbox"
              />
              <MdOutlineCheckBox className="check-icon" />
            </label>
            <label>
              <input
                type="radio"
                name="displayOption"
                value="unchecked"
                checked={selectedDisplayOption === 'unchecked'}
                onChange={handleDisplayOptionChange}
                className="hidden-checkbox"
              />
              <MdOutlineCheckBoxOutlineBlank className="check-icon" />
            </label>
            <label>
              <input
                type="radio"
                name="displayOption"
                value="both"
                checked={selectedDisplayOption === 'both'}
                onChange={handleDisplayOptionChange}
                className="hidden-checkbox"
              />
              <MdOutlineLibraryAddCheck className="check-icon" />
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
                <button key={tag} className="tag-button" onClick={() => handleRemoveTag(tag)}>
                  {tag}
                  <RxCross1 className="cross-icon" />
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
});

export { TaskFilter };
export type { TaskFilterProps };

