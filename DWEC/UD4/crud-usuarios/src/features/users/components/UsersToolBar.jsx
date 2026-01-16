function UsersToolBar({ inputText }) {
    return (
        <div className="users-tool-bar">
            <input
                type="text"
                placeholder="Consultar por nombre..."
                onChange={(e) => inputText(e.target.value)}
            ></input>
        </div>
    );
}

export default UsersToolBar;
