import React, { useState } from 'react';
import { useContentStore } from '../../store/adminContentStore';
import { Button } from '../../../user/components/ui/button';
import { Input } from '../../../user/components/ui/input';
import { Label } from '../../../user/components/ui/label';
import { Textarea } from '../../../user/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../user/components/ui/card';
import { Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { useToast } from '../../../user/components/Toast';

export function AboutContent() {
    const { content, updatePageContent } = useContentStore();
    const { toast } = useToast();
    const [aboutData, setAboutData] = useState(content.aboutPage);

    const handleSave = () => {
        updatePageContent('aboutPage', aboutData);
        toast({
            title: 'Content Updated',
            description: 'About page content saved successfully!',
        });
    };

    const handleReset = () => {
        setAboutData(content.aboutPage);
        toast({
            title: 'Changes Discarded',
            description: 'About page content reset to last saved state.',
            variant: 'destructive'
        });
    };

    const updateHero = (field, value) => {
        setAboutData(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const updateValue = (index, field, value) => {
        setAboutData(prev => ({
            ...prev,
            values: prev.values.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeValue = (index) => {
        setAboutData(prev => ({
            ...prev,
            values: prev.values.filter((_, i) => i !== index)
        }));
    };

    const addValue = () => {
        setAboutData(prev => ({
            ...prev,
            values: [...prev.values, {
                id: Date.now(),
                icon: 'Zap',
                title: 'NEW VALUE',
                description: 'Add description'
            }]
        }));
    };

    const updateContent = (field, value) => {
        setAboutData(prev => ({
            ...prev,
            content: { ...prev.content, [field]: value }
        }));
    };

    const updateParagraph = (index, value) => {
        const newParagraphs = [...aboutData.content.paragraphs];
        newParagraphs[index] = value;
        updateContent('paragraphs', newParagraphs);
    };

    const addParagraph = () => {
        updateContent('paragraphs', [...aboutData.content.paragraphs, '']);
    };

    const removeParagraph = (index) => {
        updateContent('paragraphs', aboutData.content.paragraphs.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">About Page Content</h1>
                    <p className="text-muted-foreground mt-2">Manage mission, core values, and company story</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Discard
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hero / Mission Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Mission Section</CardTitle>
                        <CardDescription>The big heading and main mission statement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Hero Heading</Label>
                            <Input
                                value={aboutData.hero.heading}
                                onChange={(e) => updateHero('heading', e.target.value)}
                                placeholder="OUR MISSION"
                                className="font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Mission Statement</Label>
                            <Textarea
                                value={aboutData.hero.mission}
                                onChange={(e) => updateHero('mission', e.target.value)}
                                rows={5}
                                placeholder="We started ELECTRICI-TOYS..."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Company Story / Content Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Company Story</CardTitle>
                        <CardDescription>Detailed history and philosophy sections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Content Heading</Label>
                            <Input
                                value={aboutData.content.heading}
                                onChange={(e) => updateContent('heading', e.target.value)}
                                placeholder="ENGINEERED FOR THRILLS"
                                className="font-bold"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Story Paragraphs</Label>
                                <Button onClick={addParagraph} variant="outline" size="sm" className="h-7 gap-1">
                                    <Plus className="h-3 w-3" /> Add
                                </Button>
                            </div>
                            {aboutData.content.paragraphs.map((p, i) => (
                                <div key={i} className="flex gap-2">
                                    <Textarea
                                        value={p}
                                        onChange={(e) => updateParagraph(i, e.target.value)}
                                        rows={3}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeParagraph(i)}
                                        className="text-destructive h-fit"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label>Visual Emoji</Label>
                            <Input
                                value={aboutData.content.emoji}
                                onChange={(e) => updateContent('emoji', e.target.value)}
                                className="text-3xl w-20 h-20 text-center"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Values Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Core Values</CardTitle>
                            <CardDescription>Grid of 4 values with icons</CardDescription>
                        </div>
                        <Button onClick={addValue} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Value
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {aboutData.values.map((v, i) => (
                        <div key={v.id} className="p-4 rounded-xl border bg-secondary/10 space-y-4 relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeValue(i)}
                                className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold">Lucide Icon</Label>
                                <Input
                                    value={v.icon}
                                    onChange={(e) => updateValue(i, 'icon', e.target.value)}
                                    placeholder="Zap"
                                    className="h-8"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold">Title</Label>
                                <Input
                                    value={v.title}
                                    onChange={(e) => updateValue(i, 'title', e.target.value)}
                                    placeholder="INNOVATION"
                                    className="font-bold h-8"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold">Description</Label>
                                <Textarea
                                    value={v.description}
                                    onChange={(e) => updateValue(i, 'description', e.target.value)}
                                    placeholder="Add description..."
                                    className="text-xs h-20"
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
