import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const ManageUsersPage = () => {
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUsers([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'business',
          status: 'active',
          joinDate: '2024-01-15',
          lastLogin: '2024-01-04',
          cardsCount: 5
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'sarah.smith@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-01-18',
          lastLogin: '2024-01-03',
          cardsCount: 2
        },
        {
          id: '3',
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.j@example.com',
          role: 'business',
          status: 'inactive',
          joinDate: '2024-01-10',
          lastLogin: '2023-12-28',
          cardsCount: 8
        },
        {
          id: '4',
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-01-20',
          lastLogin: '2024-01-04',
          cardsCount: 1
        },
        {
          id: '5',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@futuristcards.com',
          role: 'admin',
          status: 'active',
          joinDate: '2023-12-01',
          lastLogin: '2024-01-04',
          cardsCount: 0
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSelectedUsers(prev => prev.filter(id => id !== userId));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    if (action === 'delete') {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return '#EF4444';
      case 'business':
        return '#8B5CF6';
      case 'user':
      default:
        return '#10B981';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' ? '#10B981' : '#6B7280';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
          style={{ borderColor: currentTheme.colors.primary }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Users | FuturistCards</title>
        <meta name="description" content="Manage users and their roles in FuturistCards platform" />
      </Helmet>

      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Manage Users
            </h1>
            <p 
              className="text-lg"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Manage user accounts, roles, and permissions
            </p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text.primary
                }}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="business">Business</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            {selectedUsers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-2"
              >
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  Delete Selected ({selectedUsers.length})
                </button>
              </motion.div>
            )}
          </div>

          {/* Users Table */}
          <motion.div
            className="glass-card rounded-xl overflow-hidden"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: currentTheme.colors.background + '50' }}>
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length}
                        onChange={() => {
                          if (selectedUsers.length === filteredUsers.length) {
                            setSelectedUsers([]);
                          } else {
                            setSelectedUsers(filteredUsers.map(u => u.id));
                          }
                        }}
                        className="rounded"
                      />
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      User
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Role
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Status
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Cards
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Join Date
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Last Login
                    </th>
                    <th className="p-4 text-left font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredUsers.map((userData) => (
                      <motion.tr
                        key={userData.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t hover:bg-opacity-50 transition-colors duration-200"
                        style={{ borderColor: currentTheme.colors.border }}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(userData.id)}
                            onChange={() => handleSelectUser(userData.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium" style={{ color: currentTheme.colors.text.primary }}>
                              {userData.firstName} {userData.lastName}
                            </div>
                            <div className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                              {userData.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={userData.role}
                            onChange={(e) => handleRoleChange(userData.id, e.target.value)}
                            className="px-3 py-1 rounded-full text-sm font-medium border"
                            style={{
                              backgroundColor: getRoleBadgeColor(userData.role) + '20',
                              color: getRoleBadgeColor(userData.role),
                              borderColor: getRoleBadgeColor(userData.role)
                            }}
                            disabled={userData.id === user?.id}
                          >
                            <option value="user">User</option>
                            <option value="business">Business</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <select
                            value={userData.status}
                            onChange={(e) => handleStatusChange(userData.id, e.target.value)}
                            className="px-3 py-1 rounded-full text-sm font-medium border"
                            style={{
                              backgroundColor: getStatusBadgeColor(userData.status) + '20',
                              color: getStatusBadgeColor(userData.status),
                              borderColor: getStatusBadgeColor(userData.status)
                            }}
                            disabled={userData.id === user?.id}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <span style={{ color: currentTheme.colors.text.primary }}>
                            {userData.cardsCount}
                          </span>
                        </td>
                        <td className="p-4">
                          <span style={{ color: currentTheme.colors.text.secondary }}>
                            {new Date(userData.joinDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span style={{ color: currentTheme.colors.text.secondary }}>
                            {new Date(userData.lastLogin).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteUser(userData.id)}
                            disabled={userData.id === user?.id}
                            className="px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-8 text-center">
                <p style={{ color: currentTheme.colors.text.secondary }}>
                  No users found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>

          {/* Summary */}
          <div className="mt-6 flex justify-between items-center text-sm" style={{ color: currentTheme.colors.text.secondary }}>
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
            <span>
              {users.filter(u => u.status === 'active').length} active users
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsersPage;
