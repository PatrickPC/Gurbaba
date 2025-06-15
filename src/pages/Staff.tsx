
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Staff = () => {
  const staffMembers = [
    {
      id: 1,
      name: "Anup Kaphle",
      position: "Editor-in-Chief",
      department: "Editorial",
      email: "anup@kathmandupost.com",
      phone: "+977-1-4270774",
      joinDate: "2018",
      bio: "Veteran journalist with over 15 years of experience in print and digital media.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Priyanka Poudel",
      position: "Deputy Editor",
      department: "Editorial",
      email: "priyanka@kathmandupost.com",
      phone: "+977-1-4270775",
      joinDate: "2020",
      bio: "Specializes in political reporting and investigative journalism.",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Rajesh Khadka",
      position: "Sports Editor",
      department: "Sports",
      email: "rajesh@kathmandupost.com",
      phone: "+977-1-4270776",
      joinDate: "2019",
      bio: "Covers national and international sports with focus on cricket and football.",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Sita Gurung",
      position: "Business Reporter",
      department: "Business",
      email: "sita@kathmandupost.com",
      phone: "+977-1-4270777",
      joinDate: "2021",
      bio: "Covers financial markets, corporate news, and economic policy.",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Arun Budhathoki",
      position: "Technology Editor",
      department: "Technology",
      email: "arun@kathmandupost.com",
      phone: "+977-1-4270778",
      joinDate: "2020",
      bio: "Reports on technology trends, startups, and digital innovation in Nepal.",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Maya Sharma",
      position: "Culture & Lifestyle Editor",
      department: "Culture",
      email: "maya@kathmandupost.com",
      phone: "+977-1-4270779",
      joinDate: "2019",
      bio: "Covers arts, culture, entertainment, and lifestyle trends.",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Bikash Sangraula",
      position: "Photo Editor",
      department: "Photography",
      email: "bikash@kathmandupost.com",
      phone: "+977-1-4270780",
      joinDate: "2017",
      bio: "Award-winning photojournalist specializing in documentary photography.",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      name: "Kritika Sigdel",
      position: "Digital Content Manager",
      department: "Digital",
      email: "kritika@kathmandupost.com",
      phone: "+977-1-4270781",
      joinDate: "2022",
      bio: "Manages online content strategy and social media presence.",
      image: "/placeholder.svg"
    }
  ];

  const departments = [...new Set(staffMembers.map(member => member.department))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/about" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to About Us
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who bring you the news every day. Our diverse team of journalists, 
            editors, and support staff work tirelessly to deliver quality journalism.
          </p>
        </div>

        {/* Department Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {departments.map((dept) => (
            <div key={dept} className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {staffMembers.filter(member => member.department === dept).length}
              </div>
              <div className="text-sm text-gray-600">{dept}</div>
            </div>
          ))}
        </div>

        {/* Staff Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                <p className="text-red-600 font-semibold">{member.position}</p>
                <p className="text-sm text-gray-500">{member.department} Department</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <a href={`mailto:${member.email}`} className="hover:text-red-600 transition-colors">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} />
                    <span>Joined in {member.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented journalists, editors, and media professionals 
            who share our commitment to quality journalism and public service.
          </p>
          <Link 
            to="/careers" 
            className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors"
          >
            View Career Opportunities
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Staff;
