
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';

interface BreakingNewsItem {
  id: string;
  title: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const BreakingNewsManager = () => {
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchBreakingNews = async () => {
    try {
      const { data, error } = await supabase
        .from('breaking_news')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBreakingNews(data || []);
    } catch (error) {
      console.error('Error fetching breaking news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch breaking news items.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    setIsLoading(true);
    try {
      const maxOrder = Math.max(...breakingNews.map(item => item.display_order), 0);
      
      const { error } = await supabase
        .from('breaking_news')
        .insert([{
          title: newTitle.trim(),
          display_order: maxOrder + 1,
          is_active: true
        }]);

      if (error) throw error;

      setNewTitle('');
      fetchBreakingNews();
      toast({
        title: "Success",
        description: "Breaking news item added successfully.",
      });
    } catch (error) {
      console.error('Error adding breaking news:', error);
      toast({
        title: "Error",
        description: "Failed to add breaking news item.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: BreakingNewsItem) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleSaveEdit = async () => {
    if (!editingTitle.trim() || !editingId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('breaking_news')
        .update({ title: editingTitle.trim() })
        .eq('id', editingId);

      if (error) throw error;

      setEditingId(null);
      setEditingTitle('');
      fetchBreakingNews();
      toast({
        title: "Success",
        description: "Breaking news item updated successfully.",
      });
    } catch (error) {
      console.error('Error updating breaking news:', error);
      toast({
        title: "Error",
        description: "Failed to update breaking news item.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this breaking news item?')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('breaking_news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchBreakingNews();
      toast({
        title: "Success",
        description: "Breaking news item deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting breaking news:', error);
      toast({
        title: "Error",
        description: "Failed to delete breaking news item.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('breaking_news')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      fetchBreakingNews();
      toast({
        title: "Success",
        description: `Breaking news item ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
      });
    } catch (error) {
      console.error('Error toggling breaking news status:', error);
      toast({
        title: "Error",
        description: "Failed to update breaking news status.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Manage "What's News" Bar</CardTitle>
        <CardDescription>
          Add and manage breaking news items that appear in the scrolling news bar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new breaking news */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="new-breaking-news">Add New Breaking News</Label>
              <Input
                id="new-breaking-news"
                placeholder="Enter breaking news title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAdd} 
                disabled={isLoading || !newTitle.trim()}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>

          {/* Breaking news list */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakingNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      />
                    ) : (
                      <span className={!item.is_active ? 'text-gray-500' : ''}>
                        {item.title}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(item.id, item.is_active)}
                      className={item.is_active ? 'text-green-600' : 'text-gray-500'}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </Button>
                  </TableCell>
                  <TableCell>{item.display_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {editingId === item.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={isLoading}
                          >
                            <Save size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            disabled={isLoading}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {breakingNews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No breaking news items found. Add your first item above.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakingNewsManager;