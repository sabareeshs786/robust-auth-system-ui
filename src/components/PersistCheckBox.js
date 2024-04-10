export default function PersistCheckBox({toggleCheck, check}){
    return (
        <div className="persistCheck">
            <div>
            <input
                type="checkbox"
                id="persist"
                onChange={toggleCheck}
                checked={check}
            />
            </div>
            <div>
            <label htmlFor="persist" className='custom-label'>Trust This Device</label>
            </div>
        </div>
    );
}