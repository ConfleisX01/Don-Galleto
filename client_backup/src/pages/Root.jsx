import Menu from "../components/dashboard/Menu"
import MenuItem from "../components/dashboard/Menu_Item"
import { IoHomeOutline } from "react-icons/io5"
import { MdAttachMoney } from "react-icons/md"
import { BsBoxSeam } from "react-icons/bs"
import { GoChecklist } from "react-icons/go"
import { GiGearHammer } from "react-icons/gi"
import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <>
            <div className="flex w-full h-screen">
                <div className="p-2">
                    <Menu>
                        <MenuItem
                            icon={<IoHomeOutline />}
                            navigation={'system/dashboard'}
                            label={'Dashboard'}
                        />
                        <MenuItem
                            icon={<MdAttachMoney />}
                            navigation={'system/sales'}
                            label={'Ventas'}
                        />
                        <MenuItem
                            icon={<BsBoxSeam />}
                            navigation={'system/inventory'}
                            label={'Inventario'}
                        />
                        <MenuItem
                            icon={<GoChecklist />}
                            navigation={'system/reports'}
                            label={'Reportes'}
                        />
                        <MenuItem
                            icon={<GiGearHammer />}
                            navigation={'system/production'}
                            label={'Producción'}
                        />
                    </Menu>
                </div>
                <div className="grow overflow-y-scroll p-2">
                    <Outlet />
                </div>
            </div>
        </>
    )
}