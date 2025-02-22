import { Listbox } from '@headlessui/react';
import chevronDown from '../../assets/svgs/icon-chevron-down.svg';
import { cc } from '../../utils/cc';

type SelectColumnType = {
    id: string;
    columnIndex: number;
    columnName: string;
};
type SelectMenuProps = {
    items: SelectColumnType[];
    selected: SelectColumnType;
    setSelected: React.Dispatch<React.SetStateAction<SelectColumnType>>;
};

export function SelectMenu({ items, selected, setSelected }: SelectMenuProps) {
    return (
        <div className="relative w-full">
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Button className={cc("w-full cursor-pointer flex items-center justify-between border p-2 sm:p-3 text-sm sm:text-base rounded-md text-dark-black dark:text-white bg-white dark:bg-gray-800", open ? "border-dark-violet" : "border-gray-300")}>
                            {selected.columnName}
                            <img
                                src={chevronDown}
                                alt="Arrow down"
                                className="w-3"
                            />
                        </Listbox.Button>

                        <Listbox.Options className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md z-20">
                            {items.map((item) => (
                                <Listbox.Option
                                    key={item.id}
                                    value={item}
                                    className={({ active }) =>
                                        `p-2 sm:p-3 cursor-pointer ${active ? 'bg-dark-violet text-white' : 'text-dark-black dark:text-white'}`
                                    }
                                >
                                    {item.columnName}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </>
                )}
            </Listbox>
        </div>
    );
}
