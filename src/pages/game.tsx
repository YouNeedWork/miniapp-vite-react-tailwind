import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Star, Coins, Gift, Home, Settings, MessageCircle, Menu, ChevronDown, Trophy, Users, Zap, Clock, ArrowRight, Sparkles } from 'lucide-react'
import React from "react"

interface ResourceBarProps {
    coins?: number
    gems?: number
    energy?: number
    maxEnergy?: number
}

function ResourceBar({ coins = 1000, gems = 10, energy = 80, maxEnergy = 100 }: ResourceBarProps) {
    return (
        <div className="flex justify-between items-center px-4 py-2 rounded-lg shadow-sm bg-yellow-100/90">
            <div className="flex gap-2 items-center">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-900">{coins}</span>
            </div>
            <div className="flex gap-2 items-center">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">{gems}</span>
            </div>
            <div className="flex gap-2 items-center">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-900">{energy}/{maxEnergy}</span>
            </div>
        </div>
    )
}

interface QuestItemProps {
    title: string
    reward: number
    progress: number
    total: number
}

function QuestItem({ title, reward, progress, total }: QuestItemProps) {
    return (
        <Card className="p-4 bg-yellow-50">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium">{title}</h3>
                    <Progress value={(progress / total) * 100} className="w-[60%]" />
                    <span className="text-xs text-muted-foreground">{progress}/{total}</span>
                </div>
                <div className="flex gap-1 items-center">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-bold">{reward}</span>
                </div>
            </div>
        </Card>
    )
}

interface NavigationBarProps {
    onNavigate: (section: string) => void
    activeSection: string
}

function NavigationBar({ onNavigate, activeSection }: NavigationBarProps) {
    const navItems = [
        { icon: Home, label: "Home" },
        { icon: Gift, label: "Shop" },
        { icon: MessageCircle, label: "Social" },
        { icon: Settings, label: "Settings" },
    ]

    return (
        <div className="flex justify-around items-center p-4 bg-purple-100 rounded-t-xl">
            {navItems.map(({ icon: Icon, label }) => (
                <Button
                    key={label}
                    variant={activeSection === label ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => onNavigate(label)}
                    className="relative"
                >
                    <Icon className="w-6 h-6" />
                </Button>
            ))}
        </div>
    )
}

interface BuildingProps {
    name: string
    level: number
    production: number
    upgradeCost: number
    onUpgrade: () => void
}

function Building({ name, level, production, upgradeCost, onUpgrade }: BuildingProps) {
    return (
        <Card className="p-4 bg-white/80">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-muted-foreground">Level {level}</p>
                    <p className="text-sm text-green-600">+{production}/hr</p>
                </div>
                <Button onClick={onUpgrade} variant="outline" className="gap-2">
                    <Coins className="w-4 h-4" />
                    {upgradeCost}
                </Button>
            </div>
        </Card>
    )
}

function BuildingMenu() {
    const [buildings, setBuildings] = useState([
        { name: "Castle", level: 2, production: 100, upgradeCost: 1000 },
        { name: "Farm", level: 1, production: 50, upgradeCost: 500 },
        { name: "Mine", level: 3, production: 150, upgradeCost: 750 },
    ])

    const upgradeBuilding = (index: number) => {
        setBuildings(buildings.map((building, i) =>
            i === index
                ? { ...building, level: building.level + 1, production: Math.floor(building.production * 1.2), upgradeCost: Math.floor(building.upgradeCost * 1.5) }
                : building
        ))
    }

    return (
        <ScrollArea className="h-[300px] w-full rounded-md border bg-purple-50/50 p-4">
            <div className="space-y-4">
                {buildings.map((building, index) => (
                    <Building key={building.name} {...building} onUpgrade={() => upgradeBuilding(index)} />
                ))}
            </div>
        </ScrollArea>
    )
}

interface LeaderboardItemProps {
    rank: number
    name: string
    score: number
}

function LeaderboardItem({ rank, name, score }: LeaderboardItemProps) {
    return (
        <div className="flex justify-between items-center p-2 rounded-lg bg-white/60">
            <div className="flex gap-2 items-center">
                <span className="w-8 text-lg font-bold text-center">{rank}</span>
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <span>{name}</span>
            </div>
            <span className="font-bold">{score}</span>
        </div>
    )
}

function SocialPage() {
    const leaderboardData = [
        { rank: 1, name: "Player 1", score: 10000 },
        { rank: 2, name: "Player 2", score: 9500 },
        { rank: 3, name: "Player 3", score: 9000 },
        { rank: 4, name: "Player 4", score: 8500 },
        { rank: 5, name: "Player 5", score: 8000 },
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Social Hub</h2>
            <Tabs defaultValue="leaderboard">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
                <TabsContent value="leaderboard" className="mt-4 space-y-4">
                    {leaderboardData.map((player) => (
                        <LeaderboardItem key={player.rank} {...player} />
                    ))}
                </TabsContent>
                <TabsContent value="friends">
                    <Card className="p-4">
                        <h3 className="mb-2 font-medium">Friend Requests</h3>
                        <Button variant="outline" className="w-full">
                            <Users className="mr-2 w-4 h-4" /> Find Friends
                        </Button>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ShopPage() {
    const shopItems = [
        { name: "Gem Pack", cost: 99, currency: "coins", amount: 10 },
        { name: "Coin Boost", cost: 5, currency: "gems", amount: 1000 },
        { name: "Energy Refill", cost: 2, currency: "gems", amount: 50 },
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Shop</h2>
            <ScrollArea className="h-[400px] w-full rounded-md border bg-purple-50/50 p-4">
                <div className="space-y-4">
                    {shopItems.map((item) => (
                        <Card key={item.name} className="p-4 bg-white/80">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">Get {item.amount} {item.name.toLowerCase()}</p>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    {item.currency === "coins" ? <Coins className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                                    {item.cost}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

function MissionPage() {
    const missions = [
        { name: "Daily Quest", reward: 100, time: "4h", energy: 20 },
        { name: "Weekly Challenge", reward: 500, time: "2d", energy: 50 },
        { name: "Special Event", reward: 1000, time: "7d", energy: 100 },
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Missions</h2>
            <ScrollArea className="h-[400px] w-full rounded-md border bg-purple-50/50 p-4">
                <div className="space-y-4">
                    {missions.map((mission) => (
                        <Card key={mission.name} className="p-4 bg-white/80">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">{mission.name}</h3>
                                    <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{mission.time}</span>
                                        <Zap className="w-4 h-4" />
                                        <span>{mission.energy}</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <Coins className="w-4 h-4" />
                                    {mission.reward}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

function UpgradePage() {
    const [currentLevel, setCurrentLevel] = useState(1)
    const maxLevel = 10

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Upgrade Castle</h2>
            <Card className="p-6 bg-white/80">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Current Level: {currentLevel}</span>
                        <span className="font-medium">Max Level: {maxLevel}</span>
                    </div>
                    <Slider
                        value={[currentLevel]}
                        min={1}
                        max={maxLevel}
                        step={1}
                        onValueChange={(value) => setCurrentLevel(value[0])}
                    />
                    <div className="flex justify-between items-center">
                        <span>Upgrade Cost:</span>
                        <div className="flex gap-1 items-center">
                            <Coins className="w-4 h-4 text-yellow-600" />
                            <span className="font-bold">{currentLevel * 1000}</span>
                        </div>
                    </div>
                    <Button className="w-full">
                        <Sparkles className="mr-2 w-4 h-4" />
                        Upgrade to Level {currentLevel + 1}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default function Component() {
    const [activeSection, setActiveSection] = useState("Home")

    const [quests] = useState([
        { title: "Collect resources", reward: 100, progress: 5, total: 10 },
        { title: "Upgrade buildings", reward: 200, progress: 1, total: 3 },
        { title: "Complete missions", reward: 300, progress: 2, total: 5 },
    ])

    return (
        <div className="h-[844px] w-[390px] bg-gradient-to-b from-purple-100 to-pink-100 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="p-4 space-y-4">
                    <ResourceBar />
                    <Button variant="outline" className="justify-between w-full">
                        <span>Level 5</span>
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>

                <main className="overflow-auto flex-1 p-4 space-y-4">
                    {activeSection === "Home" && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Active Quests</h2>
                            {quests.map((quest) => (
                                <QuestItem key={quest.title} {...quest} />
                            ))}
                            <BuildingMenu />
                            <Button className="w-full" onClick={() => setActiveSection("Missions")}>
                                View All Missions
                            </Button>
                            <Button className="w-full" onClick={() => setActiveSection("Upgrade")}>
                                Upgrade Castle
                            </Button>
                        </div>
                    )}

                    {activeSection === "Shop" && <ShopPage />}
                    {activeSection === "Social" && <SocialPage />}
                    {activeSection === "Missions" && <MissionPage />}
                    {activeSection === "Upgrade" && <UpgradePage />}

                    {activeSection === "Settings" && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Settings</h2>
                            <Card className="p-4">
                                <h3 className="mb-2 font-medium">Game Options</h3>
                                <div className="space-y-2">
                                    <Button variant="outline" className="justify-between w-full">
                                        Sound <ChevronDown className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="justify-between w-full">
                                        Notifications <ChevronDown className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="justify-between w-full">
                                        Language <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </main>

                <NavigationBar activeSection={activeSection} onNavigate={setActiveSection} />
            </div>
        </div>
    )
}