import React, { useState,useEffect } from 'react';
import { EditIcon, DeleteIcon, CheckIcon, MoonIcon, SunIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Button, Input, useColorMode, useColorModeValue, Box, Text, Select, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, IconButton, Checkbox, InputRightElement, InputGroup, Flex } from '@chakra-ui/react';
const TodoList = () => {
  const [items, setItems] = useState([]);
  const [inputData, setInputData] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('black', 'white');
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todoItems'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);


  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('todoItems', JSON.stringify(items));
    } else {
      localStorage.removeItem('todoItems');
    }
  }, [items]);
const taskAdd = () => {
    if (!inputData) {
      return;
    } else {
      setItems([...items, { text: inputData, completed: false }]);
      setInputData('');
      setIsAddModalOpen(false); 
    }
  };

  const Delete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const Edit = (index) => {
    setEditIndex(index);
    setEditValue(items[index].text);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (editIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[editIndex] = { ...updatedItems[editIndex], text: editValue };
      setItems(updatedItems);
      setEditIndex(-1);
      setEditValue('');
      setIsEditModalOpen(false);
    }
  };

  const handleCompleteToggle = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], completed: !updatedItems[index].completed };
    setItems(updatedItems);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'incomplete') return !item.completed;
    return true;
  });

  return (
    <div className="container">
      <Text className="heading" fontSize="3xl" color={textColor}>TodoList</Text>
      <div className="TodoList" style={{ position: 'relative' }}>
        <div className="row">
          <InputGroup width="500px" marginRight="10px">
            <Input
              type="text"
              placeholder="Search tasks"
            />
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
          <Select
            className='btn'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ backgroundColor: 'blue.500'}} 
            color={textColor}
            width="100px" 
            marginLeft="5px" 
            marginRight="5px"
            padding="5px"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </Select>
          <Button
  onClick={toggleColorMode}
  style={{ backgroundColor: 'blue.500', color: 'white' }} 

>
  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
</Button>
        </div>
        
        {items.length === 0 ? (
          <Image
            src="https://res.cloudinary.com/dpadxxi3p/image/upload/v1723009215/IMG-20240807-WA0000_c0ctkp.jpg" 
            alt="No items"
            boxSize="200px"
            margin="auto"
            display="block"
          />
        ) : (
          <ul>
            {filteredItems.length === 0 ? (
              <li>No tasks to show</li>
            ) : (
              filteredItems.map((item, index) => (
                <Flex key={index} p={2} borderBottom="1px" borderColor="blue.500" alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Checkbox 
                      isChecked={item.completed}
                      onChange={() => handleCompleteToggle(index)}
                      marginRight="10px"
                    />
                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                      {item.text}
                    </span>
                  </Flex>
                  <Flex>
                    <Button className='btns' onClick={() => Edit(index)} marginRight="10px">
                      <EditIcon />
                    </Button>
                    <Button className='btns' onClick={() => Delete(index)}>
                      <DeleteIcon />
                    </Button>
                  </Flex>
                </Flex>
              ))
            )}
          </ul>
        )}
        <IconButton
          aria-label="Add task"
          icon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
          position="absolute"
          bottom="20px"
          right="20px"
          size="lg"
         colorScheme="teal"
          borderRadius="50px"
        />
        
        {/*..... Add Task Modal..... */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                placeholder="Enter task"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={taskAdd}>
                Add
              </Button>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/*..... Edit Task Modals... */}
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                placeholder="Edit task"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default TodoList;
