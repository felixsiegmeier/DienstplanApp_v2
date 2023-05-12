export default function ToggleBox({doctor}){
    return (
        <tr>
          <td colSpan="2" className="p-2">
            <div className="select-none bg-slate-600 rounded-md p-4 animate-fade-in">
              {doctor.name}
              <label class="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  class="form-checkbox rounded-md text-slate-700 border-slate-700 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
                />
                <span class="text-md ml-2">Checkbox-Text</span>
              </label>
            </div>
          </td>
        </tr>
    )
}