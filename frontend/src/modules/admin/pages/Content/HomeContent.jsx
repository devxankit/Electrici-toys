import React, { useState } from 'react';
import { useContentStore } from '../../store/adminContentStore';
import { Button } from '../../../user/components/ui/button';
import { Input } from '../../../user/components/ui/input';
import { Label } from '../../../user/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../user/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../user/components/ui/card';
import { Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { useToast } from '../../../user/components/Toast';

export function HomeContent() {
    const { content, updatePageContent } = useContentStore();
    const { toast } = useToast();
    const [homeData, setHomeData] = useState(content.homePage);

    const handleSave = () => {
        updatePageContent('homePage', homeData);
        toast({
            title: 'Content Updated',
            description: 'Home page content saved successfully!',
        });
    };

    const handleReset = () => {
        setHomeData(content.homePage);
        toast({
            title: 'Changes Discarded',
            description: 'Home page content reset to last saved state.',
            variant: 'destructive'
        });
    };

    const updateHero = (field, value) => {
        setHomeData(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const updateTrustMarker = (index, field, value) => {
        setHomeData(prev => ({
            ...prev,
            trustMarkers: prev.trustMarkers.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeTrustMarker = (index) => {
        setHomeData(prev => ({
            ...prev,
            trustMarkers: prev.trustMarkers.filter((_, i) => i !== index)
        }));
    };

    const addTrustMarker = () => {
        setHomeData(prev => ({
            ...prev,
            trustMarkers: [...prev.trustMarkers, {
                id: Date.now(),
                icon: 'Shield',
                title: 'NEW FEATURE',
                description: 'Add description'
            }]
        }));
    };

    const updateCategory = (index, field, value) => {
        setHomeData(prev => ({
            ...prev,
            categories: prev.categories.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeCategory = (index) => {
        setHomeData(prev => ({
            ...prev,
            categories: prev.categories.filter((_, i) => i !== index)
        }));
    };

    const addCategory = () => {
        setHomeData(prev => ({
            ...prev,
            categories: [...prev.categories, {
                id: Date.now(),
                name: 'New Category',
                title: 'New\nCategory',
                description: 'Add description here',
                image: '/placeholder.jpg',
                ctaText: 'EXPLORE',
                ctaLink: '/products',
                bgColor: 'primary/10',
                borderColor: 'primary/30'
            }]
        }));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Home Page Content</h1>
                    <p className="text-muted-foreground mt-2">Manage hero section, trust markers, and featured categories</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Discard Changes
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="hero" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hero">Hero Section</TabsTrigger>
                    <TabsTrigger value="trust">Trust Markers</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>

                {/* Hero Section Tab */}
                <TabsContent value="hero" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>Main banner content and call-to-action</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Background Image URL</Label>
                                <Input
                                    value={homeData.hero.image}
                                    onChange={(e) => updateHero('image', e.target.value)}
                                    placeholder="/hero.png"
                                />
                                <p className="text-xs text-muted-foreground">Recommended size: 1920x1080px</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Main Heading</Label>
                                <Input
                                    value={homeData.hero.heading}
                                    onChange={(e) => updateHero('heading', e.target.value)}
                                    placeholder="UNLEASH THE POWER OF PLAY"
                                    className="text-lg font-bold"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>CTA Button Text</Label>
                                    <Input
                                        value={homeData.hero.ctaText}
                                        onChange={(e) => updateHero('ctaText', e.target.value)}
                                        placeholder="SHOP COLLECTION"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>CTA Link</Label>
                                    <Input
                                        value={homeData.hero.ctaLink}
                                        onChange={(e) => updateHero('ctaLink', e.target.value)}
                                        placeholder="/products"
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="mt-6 p-6 bg-secondary/20 rounded-lg border-2 border-dashed">
                                <p className="text-xs text-muted-foreground mb-4 uppercase font-bold">Preview</p>
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">{homeData.hero.heading}</h2>
                                    <Button className="rounded-full font-black italic">{homeData.hero.ctaText}</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Featured Section</CardTitle>
                                    <CardDescription>Title and subtitle for products showcase</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={homeData.featuredSection.title}
                                    onChange={(e) => setHomeData(prev => ({
                                        ...prev,
                                        featuredSection: { ...prev.featuredSection, title: e.target.value }
                                    }))}
                                    placeholder="THE HIT LIST"
                                    className="font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Section Subtitle</Label>
                                <Input
                                    value={homeData.featuredSection.subtitle}
                                    onChange={(e) => setHomeData(prev => ({
                                        ...prev,
                                        featuredSection: { ...prev.featuredSection, subtitle: e.target.value }
                                    }))}
                                    placeholder="Our most-wanted electric wonders."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Trust Markers Tab */}
                <TabsContent value="trust" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">Manage trust markers (warranty, shipping, etc.)</p>
                        <Button onClick={addTrustMarker} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Marker
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {homeData.trustMarkers.map((marker, index) => (
                            <Card key={marker.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">Marker {index + 1}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTrustMarker(index)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Icon Name (Lucide)</Label>
                                        <Input
                                            value={marker.icon}
                                            onChange={(e) => updateTrustMarker(index, 'icon', e.target.value)}
                                            placeholder="Shield"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Use: Shield, Truck, CreditCard, RotateCcw, etc.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={marker.title}
                                            onChange={(e) => updateTrustMarker(index, 'title', e.target.value)}
                                            placeholder="1-YEAR WARRANTY"
                                            className="font-bold uppercase"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Input
                                            value={marker.description}
                                            onChange={(e) => updateTrustMarker(index, 'description', e.target.value)}
                                            placeholder="Full peace of mind"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Categories Tab */}
                <TabsContent value="categories" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">Manage featured category cards</p>
                        <Button onClick={addCategory} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Category
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {homeData.categories.map((category, index) => (
                            <Card key={category.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{category.name}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeCategory(index)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Category Name</Label>
                                        <Input
                                            value={category.name}
                                            onChange={(e) => updateCategory(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Display Title</Label>
                                        <Input
                                            value={category.title}
                                            onChange={(e) => updateCategory(index, 'title', e.target.value)}
                                            placeholder="Hover\nBoards"
                                        />
                                        <p className="text-xs text-muted-foreground">Use \n for line breaks</p>
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label>Description</Label>
                                        <Input
                                            value={category.description}
                                            onChange={(e) => updateCategory(index, 'description', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label>Image URL</Label>
                                        <Input
                                            value={category.image}
                                            onChange={(e) => updateCategory(index, 'image', e.target.value)}
                                            placeholder="/assets/products/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CTA Text</Label>
                                        <Input
                                            value={category.ctaText}
                                            onChange={(e) => updateCategory(index, 'ctaText', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CTA Link</Label>
                                        <Input
                                            value={category.ctaLink}
                                            onChange={(e) => updateCategory(index, 'ctaLink', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Background Color</Label>
                                        <Input
                                            value={category.bgColor}
                                            onChange={(e) => updateCategory(index, 'bgColor', e.target.value)}
                                            placeholder="primary/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Border Color (Hover)</Label>
                                        <Input
                                            value={category.borderColor}
                                            onChange={(e) => updateCategory(index, 'borderColor', e.target.value)}
                                            placeholder="primary/30"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
