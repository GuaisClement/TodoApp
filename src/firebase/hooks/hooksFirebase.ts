// useFirebase.ts
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebase';

import {TaskModel} from "../../model/task-model";

function tasksFirebase() {
  const [data, setData] = useState<TaskModel[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Task'));
        const newData = querySnapshot.docs.map((doc) => {
          const taskData = doc.data();

          const id: string = doc.id;
          const checked: boolean = taskData.checked;
          const title: string = taskData.title;
          const content: string = taskData.content;
          const date: Date = taskData.date.toDate();
          const tags: string[] = taskData.tags;

          const transformedTask: TaskModel = {
            id: id,
            checked: checked,
            title: title,
            content: content,
            date: date, // Assurez-vous de convertir Timestamp en Date si c'est le cas
            tags: tags,
          };
          return transformedTask;
        });
        
        setData(newData);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  },[]);

  return data;
};

export default tasksFirebase;
