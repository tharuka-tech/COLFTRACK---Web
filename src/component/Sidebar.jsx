import {
  LayoutDashboard,
  FilePlus,
  Edit,
  Trash2,
  ShieldAlert,
  Users,
  UserPlus,
  MapPin,
  Ban,
  UserMinus,
  UserCheck,
  LogOut,
  Check
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import reactLogo from "../assets/logo.gif";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import '../App.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      signOut(auth)
        .then(() => {
          console.log('Sign-out successful');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error sign-out failed', error);
        });
    } else {
      // User canceled logout, do nothing
      console.log('Logout canceled');
    }
  };



  return (
    // Changed 'h-screen' to 'min-h-screen' and removed 'w-64' for fixed width as 'w-64' is already there
    // Added 'fixed' and 'top-0' 'left-0' to make it stick to the top-left corner
    // Added 'z-50' for a higher z-index to ensure it's on top of other content
    <aside className="fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col z-50">
      {/* Top Logo Area */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="bg-white p-1 rounded-full shadow-md border-2 border-green-600">
          <img
            src={reactLogo}
            alt="Logo"
            className="w-16 h-16 object-contain rounded-full"
          />
        </div>
        <h1 className="text-green-600 font-bold text-lg mt-2">ColfTrack Admin Panel</h1>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 sidebar">
        <NavItem icon={<LayoutDashboard />} label="Dashboard" to="/dashboard" />

        <Section title="Loan Plans">
          <NavItem icon={<FilePlus />} label="Add New" to="/dashboard/addLoan" />
          <NavItem icon={<Edit />} label="Manage Loans" to='/dashboard/manageLoan'/>
        </Section>

        <NavItem icon={<ShieldAlert />} label="Penalty Settings" to='/dashboard/penalty' />

        <Section title="Staff Management">
           <NavItem icon={<UserPlus />} label="Register Staff"  to="/dashboard/addEmployee"/>
          <NavItem icon={<Users />} label="Staff Management" to="/dashboard/manageEmployee"/>
          <NavItem icon={<MapPin />} label="Assign Area to Rider" to="/dashboard/area"/>
        </Section>

        <Section title="Customer Management">
          <NavItem icon={<Check />} label="Approve Loan" to="/dashboard/approveCustomer"/>
          <NavItem icon={<Ban />} label="Add to Blacklist" />
        </Section>

        <Section title="Permissions">
          <NavItem icon={<UserMinus />} label="Revoke Permission" />
          <NavItem icon={<UserCheck />} label="Grant Permission" />
        </Section>
      </div>

      {/* Sticky Logout Button at Bottom */}
      <div className="px-4 py-3 border-t border-gray-700">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-800 bg-red-500 transition-all w-full"
        >
          <span className="w-5 h-5"><LogOut /></span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-green-600 transition-all"
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
  </Link>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xs uppercase text-green-600 font-semibold mb-1">
      {title}
    </h3>
    <div className="pl-2 space-y-1">{children}</div>
  </div>
);

export default Sidebar;