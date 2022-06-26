# Car-o-room

Car-o-room is a web application to manage and display the new and used cars of car selling showroom. This work is a classroom project done under supervision of ***Prof. Obinna Kalu*** for Software Engineering course.

**Team Members**

Amsale Zewdie

Diana Kihembo

Jharna Karki

Luzan Baral

Muhammad Gozlan

## Table of contents
1. [Guide for using this Github Repo](#gitrepo)
   1. [Cloning Project](#clone)
   2. [Making Changes](#changes)
   3. [Creating Branches](#branches)
   4. [Creating Pull Request](#pullrequest)

### Guide for using this Guide Repo <a href="gitrepo"></a>

This describes the guides to be used by everyone to use and make changes inside this repo.

#### Cloning Project <a href="clone"></a>

Team members need to clone the project onto their machine. To clone the project, locate a folder where you want to save this repo on your device and open Command Prompt or Terminal inside the folder. You can use this terminal command to clone it.

```shell
git clone https://github.com/luzan/car-o-room.git
```

For further terminal command you need to change the directory using this command.

```shell
cd car-o-room
```

#### Making changes <a href="changes"></a>

Everyone in team is supposed to contribute in this project and all of the contribution needs to be added to this repository. Remember, everyone is working on this repository so we need to minimize the conflicts that can arise. One of the common conflict that can arise is merge conflict and there is a simple rule we can follow to avoid it in most of the cases. 

Follow these simple steps after making changes.

```shell
git add .
git commit -m "short descriptive message"
git pull origin main
git push origin main
```

As you may see, there's `git pull origin main` this is used to bring the recent changes that is being done in the repository onto your local repository. 

> Tip: always do `git pull origin main` before you start making changes. And also before every `git push` you make.

#### Creating Branches  <a href="branches"></a>

It would be helpful and easier if every team member can create their own branch and make changes on your respective branch. That way we can declare our `main` branch to hold all the accepted and approved updates, and all other branches work as feature branch.

To create new branch, type `git checkout -b branchNameHere `, so in our case if I was working on a brach to create Use case diagrams I'd do `git checkout -b luzan-usecase`. And anything I do on this brach will not affect our main branch.

To switch back to main branch type `git checkout main`. Remember to add and commit changes on your personal branch before switching back to `main`.

> Tip: Before checkout to a new branch make sure you are checking out from the updated branch. Example, if you are checking out from the `main` branch, that main branch on your local repo needs to `pull` updates from remote main branch.

#### Creating Pull Request  <a href="pullrequest"></a>

Once you have made changes on your respective branch, you can follow same approach mentioned in [Making Changes](#changes) section to update that branch remotely. Just make sure that this time it's not `main` on `git pull` or `git push` it should be your working branch name.

After you have pushed your changes on the brach, you'll see option to merge it with main branch by creating pull request(see gif for reference). 

![Pull request gif](/documentation/git-docs/pullrequest.gif)