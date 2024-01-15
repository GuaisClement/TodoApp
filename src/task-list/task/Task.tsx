import React, { useEffect, useState } from 'react';
import './Task.css';
import { ImBin2 } from 'react-icons/im';
import { PiNotePencilBold } from 'react-icons/pi';
import { TaskModel } from '../../model/task-model';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { getTaskFromFirestore, updateTaskInFirestore } from "../../firebase/collections/useTask";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  task: TaskModel;
  taskId: string;
  onRemmoveTask: (id: string) => void;
  onChecked: (task: TaskModel) => void;
  onModifyTask: (task: TaskModel) => void;
  onSelectTag: (tag: string) => void;
  onFav: (task: TaskModel) => void;
};

const Task: React.FC<Props> = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [task, setTask] = useState<TaskModel>();
  const [open, setOpen] = useState(false);
  
    useEffect(() => {
      getTaskFromFirestore(props.taskId).then(setTask);
    }, []);

    useEffect(() => {
      setTask(props.task)
    }, [props]);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRemoveTask = () => {
      if (!task) return;
  
      if (task.favorite) {
        handleOpen();
      } else {
        props.onRemmoveTask(task.id);
      }
    };
  
    const handleConfirmRemove = () => {
      if(!task) return;
      props.onRemmoveTask(task.id);
      handleClose();
    };
  

  const handleModifyTask = () => {
    if (!task) return;

    props.onModifyTask(task);
  };

  const handleChecked = () => {
    if (!task) return;

    task.checked = !task.checked;
    props.onChecked(task);
  };

  const handleSelectTag = (tag: string) => {
    props.onSelectTag(tag);
  };

  const handleToggleFavorite = async () => {
    if (!task) return;

    const updatedTask = { ...task, favorite: !task.favorite };
    setTask({ ...updatedTask });

    props.onFav(updatedTask);
    await updateTaskInFirestore(task.id, updatedTask);
  };

  if (!task) return null;

  return (
    <div className="task">
      <div className="row-title-task">
        <input type="checkbox" checked={task.checked} onChange={handleChecked} />
        <div onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
          <h3>
            {task.title}
            <div style={{ fontSize: '12px' }}>{task.date.getUTCDate()}-{task.date.getUTCMonth() + 1}</div>
          </h3>
        </div>
        <div className="task-tags">
          {task.tags.map((tag) => (
            <button onClick={() => handleSelectTag(tag)} key={tag} className="tag-button">
              {tag}
            </button>
          ))}
        </div>
        <div className="task-icon" onClick={handleRemoveTask}>
          <ImBin2></ImBin2>
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer cette tâche en favori?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleConfirmRemove} color="primary">
            Oui
          </Button>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
        </DialogActions>
      </Dialog>
        <div className="modify-icon" onClick={handleModifyTask}>
          <PiNotePencilBold />
        </div>
        <div className="favorite-icon" onClick={handleToggleFavorite}>
          {task.favorite ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      </div>
      {showDetails && (
        <div>
          <span>{task.content}</span>
          <span>
            Date: {new Intl.DateTimeFormat('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(task.date)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Task;
