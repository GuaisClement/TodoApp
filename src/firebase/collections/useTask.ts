// taskFunctions.js
import { collection, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import app from '../firebase'; // Assurez-vous que le chemin est correct
import { TaskModel } from '../../model/task-model';
import { getFirestore } from 'firebase/firestore';

export const getTaskFromFirestore = async (id: string): Promise<TaskModel> => {
  try {
    const db = getFirestore(app);
    const docRef = await getDoc(doc(db, 'Task', id));
    const taskModel = docRef.data();

    if (!taskModel) throw new Error("Failed to fetch data");

    const transformedDate: Date = taskModel.date.toDate();

    const result = { ...docRef.data(), id, date: transformedDate };

    return result as TaskModel;
  } catch (error) {
    console.error(`Error during fetch task process in firestore ${error}`);
    throw error;
  }
}

export const addTaskToFirestore = async (taskData: any) => {
    
  try {
    taskData.id = "";
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'Task'),{
        checked: false,
        title: taskData.title,
        content: taskData.content,
        date: taskData.date,
        tags : taskData.tags,
        favorite: false
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
