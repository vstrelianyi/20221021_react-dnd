import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "the-new-css-reset/css/reset.css"
import initialData from './data';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
	const [ data, setData ] = useState( initialData );

	// const handleDragStart = () => {
	// 	document.body.style.color='orange';
	// 	document.body.style.transition = 'background-color 0.2s ease';
	// }

	// const handleDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(data.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
  // };

	const handleDragEnd = result => {
		document.body.style.color='inherit';
		const { destination, source, draggableId } = result;
		if( !destination ) return;
		if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

		const column = data.columns[source.droppableId ];
		const newTaskIds = [...column.taskIds];
		newTaskIds.splice( source.index, 1 );
		newTaskIds.splice( destination.index, 0, draggableId );

		const newColumn = {
			...column,
			taskIds: newTaskIds
		}

		const newState = {
			...data,
			columns: {
				...data.columns,
				[newColumn.id]: newColumn
			}
		}

		setData( newState );
	}

	return(
		<DragDropContext
			onDragEnd ={ handleDragEnd }
			// onDragStart = { handleDragStart }
			// onDragUpdate = { handleDragUpdate }
		>
			{ data.columnOrder.map( columnId => {
				const column = data.columns[columnId ];
				const tasks = column.taskIds.map( taskId => data.tasks[taskId] )
				return ( <Column key={column.title} column={ column } tasks={ tasks }/> );
			}) }
		</DragDropContext>
	)
};

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App/>);
