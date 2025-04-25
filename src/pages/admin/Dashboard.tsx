import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { getArtworks, deleteArtwork, updateArtwork, Artwork } from '../../services/firebase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const data = await getArtworks();
      setArtworks(data);
      setError(null);
    } catch (err) {
      console.error('Error loading artworks:', err);
      setError('Failed to load artworks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      await deleteArtwork(deleteId);
      
      // Update the local state
      setArtworks(artworks.filter(artwork => artwork.id !== deleteId));
      setActionSuccess('Artwork deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error deleting artwork:', err);
      setError('Failed to delete artwork. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const toggleFeatured = async (artwork: Artwork) => {
    if (!artwork.id) return;
    
    try {
      await updateArtwork(artwork.id, { 
        featured: !artwork.featured 
      });
      
      // Update local state
      setArtworks(artworks.map(item => 
        item.id === artwork.id 
          ? { ...item, featured: !item.featured } 
          : item
      ));
      
      setActionSuccess(`Artwork ${!artwork.featured ? 'featured' : 'unfeatured'} successfully`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating artwork:', err);
      setError('Failed to update artwork. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <Link to="/admin/upload" className="btn btn-primary inline-flex items-center">
            <Plus size={18} className="mr-2" />
            Add New Artwork
          </Link>
        </div>
        
        {error && (
          <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {actionSuccess && (
          <div className="bg-success-500 bg-opacity-10 border border-success-500 text-success-500 px-4 py-3 rounded mb-6">
            {actionSuccess}
          </div>
        )}
        
        {artworks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No artworks found</p>
            <Link to="/admin/upload" className="btn btn-outline inline-flex items-center">
              <Plus size={18} className="mr-2" />
              Add Your First Artwork
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className={deleteId === artwork.id ? 'bg-red-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-16 rounded overflow-hidden">
                        <img 
                          src={artwork.imageUrl} 
                          alt={artwork.title} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{artwork.year || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleFeatured(artwork)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          artwork.featured 
                            ? 'bg-primary-100 text-primary-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {artwork.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteId === artwork.id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="text-white bg-error-500 hover:bg-error-600 p-1.5 rounded"
                          >
                            {isDeleting ? 
                              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 
                              <Check size={16} />
                            }
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="text-gray-600 bg-gray-200 hover:bg-gray-300 p-1.5 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/upload?edit=${artwork.id}`}
                            className="text-primary-600 hover:text-primary-900 p-1.5"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(artwork.id!)}
                            className="text-error-500 hover:text-error-700 p-1.5"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;