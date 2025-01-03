import { useState, useEffect, useRef } from 'react';
import Column from './Column/Column';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { postNewColumnApi } from '~/apis';
import { generatePlaceholderCard } from '~/utils/formatters';
import { cloneDeep } from 'lodash';
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';
import { useDispatch, useSelector } from 'react-redux';

function Columns({ columns }) {
  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch();

  // Add new column
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [openAddNewColumnForm, setOpenAddNewColumnForm] = useState(false);
  const toggleOpenAddNewColumnForm = () => setOpenAddNewColumnForm(!openAddNewColumnForm);
  const addNewColumn = async () => {
    if (newColumnTitle) {
      setNewColumnTitle('');
      setOpenAddNewColumnForm(false);

      // Call API
      const newColumn = await postNewColumnApi({
        title: newColumnTitle,
        boardId: board._id
      });

      // Add placeholder card for new column
      const placeholderCard = generatePlaceholderCard(newColumn);
      newColumn.cardOrderIds.push(placeholderCard._id);
      newColumn.cards.push(placeholderCard);

      // Update column in board (don't need GET API make slower server)
      const newBoard = cloneDeep(board);
      newBoard.columnOrderIds.push(newColumn._id);
      newBoard.columns.push(newColumn);

      dispatch(updateCurrentActiveBoard(newBoard));
      toast.success('Column created.');
    } else {
      toast.error('Column title required.');
    }
  };

  // Handle openAddNewColumnForm true when user click outside will false
  const addNewColumnForm = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!addNewColumnForm?.current?.contains(event?.target)) {
        toggleOpenAddNewColumnForm();
      }
    };
    if (openAddNewColumnForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openAddNewColumnForm]);

  return (
    <>

      {/* List columns */}
      <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
        {columns?.map((column) => <Column key={column._id} column={column} />)}
      </SortableContext>

      {/* Add another column button */}
      {openAddNewColumnForm ?
        <Box
          ref={addNewColumnForm}
          sx={{
            maxWidth: '272px',
            minWidth: '272px',
            ml: 2,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2341' : '#f0f5ff'),
            borderRadius: '6px',
            height: 'fit-content',
            p: 1
          }}
        >
          <TextField autoComplete='off' placeholder="Enter column title..." autoFocus size='small' type='text' variant="outlined"
            value={newColumnTitle} onChange={(e) => setNewColumnTitle(e.target.value)}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db !important'
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db !important'
              }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Button className='interceptor-loading' variant="contained" size='small' color='info'
              onClick={addNewColumn}
              sx={{
                marginRight: 1
              }}>
              Add column
            </Button>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={toggleOpenAddNewColumnForm} />
          </Box>
        </Box>
        :
        <Box
          sx={{
            maxWidth: '272px',
            minWidth: '272px',
            ml: 2,
            bgcolor: '#ffffff3d',
            borderRadius: '6px',
            height: 'fit-content'
          }}
          onClick={toggleOpenAddNewColumnForm}>
          <Button variant="text" startIcon={<AddIcon />}
            sx={{ width: '100%', justifyContent: 'flex-start', p: 2, color: 'white' }}>
            Add another column
          </Button>
        </Box>
      }
    </>
  );
}

export default Columns;