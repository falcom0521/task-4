# Personal Task Manager App

## Objective
A mobile application built with React Native and Expo for managing personal tasks efficiently.

## Key Features
- User Authentication with local storage
- Task Management (Create, Read, Update, Delete)
- Dashboard for task overview
- Data Persistence using AsyncStorage
- Responsive UI/UX with custom animations

## Technical Stack
- React Native, Expo
- AsyncStorage, Redux Toolkit, React Navigation
- Various UI components: @devvie/bottom-sheet, @expo/vector-icons, etc.

## Setup Instructions
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install` or `yarn install`.
4. Start the Expo server: `expo start`.

## Project Structure
- `src/`
  - `screens/`: Contains all screen components.
  - `components/`: Reusable UI components.
  - `redux/`: Redux setup for state management.
  - `navigation/`: React Navigation setup.

## Design Decisions
- Used Redux Toolkit for efficient state management.
- Chose AsyncStorage for simple data persistence without a backend.

## Testing
- Implemented unit tests using Jest for critical components.

## Known Issues and Future Improvements
- No known issues.
- Future: Implement push notifications for task reminders.

## Credits
- Icons by @expo/vector-icons
- Bottom sheet library by @devvie/bottom-sheet

## License
This project is licensed under the MIT License - see the LICENSE file for details.
