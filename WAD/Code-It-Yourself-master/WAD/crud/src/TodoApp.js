import React, { useState } from 'react';

function TodoApp() {
    const [items, setItems] = useState([])
    const [text, setText] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const addItem = () => {
        if (text.trim() !== '') {
            if (editIndex === -1) {
                setItems([...items, text]);
            } else {
                const updatedItems = [...items];
                updatedItems[editIndex] = text;
                setItems(updatedItems);
                setEditIndex(-1);
            }
            setText('');
        }
    };

    const deleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const editItem = (index) => {
        setText(items[index]);
        setEditIndex(index);
    };

    return (
        <div>
            <h2>Todo App</h2>
            <input type="text" value={text} onChange={handleInputChange} />
            <button onClick={addItem}>{editIndex === -1 ? 'Add Item' : 'Update Item'}</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => editItem(index)}>Edit</button>
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoApp;