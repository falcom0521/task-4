import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';


const useNotification = () => {
    const scheduleNotification = async (task) => {
      
        try {
          const triggerTime = new Date(`${task.date}T${task.time}`);
          const identifier = task.id.toString(); // Use task ID as notification identifier
    
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `${task.name} - ${format(triggerTime, 'yyyy-MM-dd HH:mm')}`,
              body: task.tittle, // Adjust based on your task structure
            },
            trigger: { date: triggerTime },
            identifier: identifier,
          });
        } catch (error) {
          console.log('Error scheduling notification:', error);
        }
      };
    
      return {
        scheduleNotification,
      };
    
}


export default useNotification