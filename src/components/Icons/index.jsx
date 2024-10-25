/* eslint-disable react/prop-types */
import { Spinner } from "flowbite-react";
import { IconContext, User, AngleDown, ListCheck, SignOutAlt, Info, AngleCircleDown, TableLayout, Add, ChartConnected, ChartHistogram, ChartLineUp, Check, Cross, SortAmountDown, SortAmountUp, DeleteDocument, } from "react-flaticons";
export function ProfileIcons() {
  return (<>
    <IconContext.Provider value={{ size: "16px" }}>
      <User />
    </IconContext.Provider>
    <IconContext.Provider value={{ size: "13px" }}>
      <AngleDown />
    </IconContext.Provider>
  </>);
}
export function ProfileIcon() {
  return (<>
    <IconContext.Provider value={{ color: "#4F8DF9", size: "15px" }}>
      <User />
    </IconContext.Provider>
  </>);
}
export function ItemCheckedIcon() {
  return (<>
    <IconContext.Provider value={{ color: "white", size: "16px" }}>
      <Check />
    </IconContext.Provider>
  </>);
}
export function ItemCloseIcon() {
  return (<>
    <IconContext.Provider value={{ color: "white", size: "16px" }}>
      <Cross />
    </IconContext.Provider>
  </>);
}
export function CheckListIcon() {
  return (<>
    <IconContext.Provider value={{ size: "15px" }}>
      <ListCheck />
    </IconContext.Provider>
  </>);
}
export function LogoutIcon() {
  return (<>
    <IconContext.Provider value={{ color: "red", size: "15px" }}>
      <SignOutAlt />
    </IconContext.Provider>
  </>);
}
export function FilterColumnIcon() {
  return (<>
    <IconContext.Provider value={{ size: "13px" }}>
      <AngleDown />
    </IconContext.Provider>
  </>);
}
export function InfoIcon() {
  return (<>
    <IconContext.Provider value={{ color: "#737373", size: "64px" }}>
      <Info />
    </IconContext.Provider>
  </>);
}
export function FilterDescIcon() {
  return (<>
    <IconContext.Provider value={{ color: "#3b82f6", size: "16px" }}>
      <AngleCircleDown />
    </IconContext.Provider>
  </>);
}
export function TableIcon() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <TableLayout />
    </IconContext.Provider>
  </>);
}
export function AddLicense() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <Add />
    </IconContext.Provider>
  </>);
}
export function RemoveLicense() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <DeleteDocument />
    </IconContext.Provider>
  </>);
}
export function DashGestor() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <ChartConnected />
    </IconContext.Provider>
  </>);
}
export function DashMonitor() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <ChartHistogram />
    </IconContext.Provider>
  </>);
}
export function DashOps() {
  return (<>
    <IconContext.Provider value={{ size: "18px" }}>
      <ChartLineUp />
    </IconContext.Provider>
  </>);
}
export function LoadingIcon({ iconParams }) {
  const size = `${iconParams.size}`;
  const color = `${iconParams.color}`;
  return (<>
    <Spinner className={color} size={size} />
  </>);
}
export function SortingUpIcon() {
  return (<>
    <IconContext.Provider value={{ size: "20px" }}>
      <SortAmountUp />
    </IconContext.Provider>
  </>);
}
export function SortingDownIcon() {
  return (<>
    <IconContext.Provider value={{ size: "20px" }}>
      <SortAmountDown />
    </IconContext.Provider>
  </>);
}
