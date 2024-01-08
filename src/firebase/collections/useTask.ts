// taskFunctions.js
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase'; // Assurez-vous que le chemin est correct
import { TaskModel } from '../../model/task-model';
import { getFirestore } from 'firebase/firestore';

export const addTaskToFirestore = async (taskData: any) => {
    
  try {
    taskData.id = "";
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'Task'),{
        checked: false,
        title: taskData.title,
        content: taskData.content,
        date: taskData.date,
        tags : taskData.tags
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const removeTaskFromFirestore = async (taskId: string) => {
  
  try {
    const db = getFirestore(app);
    const taskDocRef = doc(db, 'Task', taskId);
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error('Error removing document: ', error);
    throw error;
  }
};

export const updateTaskInFirestore = async (taskId: string, updatedTaskData: Partial<TaskModel>) => {
  try {
    const db = getFirestore(app);
    const taskDocRef = doc(db, 'Task', taskId);
    await updateDoc(taskDocRef, updatedTaskData);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};
